import { Form, Button } from "react-bootstrap";

export const ReviewForm = ({handleSubmit, revText, labelText, defaultValue}) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label >{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} placeholder="Enter your review here..." />
            </Form.Group>
            <Button variant="outline-warning"  onClick={handleSubmit}><b>Submit</b></Button>
        </Form>
    )
}