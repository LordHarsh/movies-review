import database from '../../loaders/database';
import { ObjectId } from 'mongodb';
import { ERRORS } from '../../shared/errors';

 export const handleGetAllLinks = async ( user_id: string): Promise<unknown> => {
    const collection = (await database()).collection('links');
    const links = await collection.find({user_id, isDeleted:false}, {projection:{isDeleted:0}}).toArray();
    if(!links){
        throw new Error(ERRORS.LINK_NOT_FOUND_ERROR.message.error_description);
    }
    return links;
  };
export const handleCreateLink = async (platform: string, link: string, user_id: string): Promise<void> => {
    const collection = (await database()).collection('links');
    const exists = await collection.findOne({platform, link, user_id});
    if (exists) {
        if(exists.isDeleted){
            await collection.updateOne(exists, {$set: {isDeleted: false}});
            return;
        }
        throw new Error(ERRORS.LINK_ALREADY_EXISTS_ERROR.message.error_description);
    }
    await collection.insertOne({
        platform,
        link,
        user_id,
        isDeleted: false,
    });
    return;
};
export const handleGetLinkById = async ( user_id : string, _id : string): Promise<unknown> => {
  const collection = (await database()).collection('links');
  const link = await collection.findOne({
    $and:
    [
      { _id: new ObjectId(_id) },
      { user_id },
      { isDeleted: false }
    ] 
  });
  if(!link){
      throw new Error('Link not found');
  }
  return link;
};

export const handleDeleteLink = async (_id: string, user_id: string): Promise<void> => {
  const collection = (await database()).collection('links');
  const link = await collection.findOne({
    $and:
    [
      { _id: new ObjectId(_id) },
      { user_id }
    ] 
  });
  if(!link){
    throw new Error('Link not found'); 
  }
  await collection.updateOne(link, {$set: {isDeleted: true}});
  return;
};

export const handleUpdateLink = async (platform: string, link: string, user_id: string): Promise<void> => {
    const collection = (await database()).collection('links');

    await collection.updateOne(
        { platform: platform, user_id: user_id },
        {
            $set: {
                link: link
            },
        }
    );
    return;
};