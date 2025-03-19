import './App.css'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'

function Signup() {
    return (
        <div>
            <h1>signup header</h1>
            <Editable placeholder='Username'>
                <EditablePreview />
                <EditableInput />
            </Editable>
            <Editable placeholder='Email'>
                <EditablePreview />
                <EditableInput />
            </Editable>
            <Editable placeholder='Password'>
                <EditablePreview />
                <EditableInput />
            </Editable>
        </div>
    )
}

export default Signup;