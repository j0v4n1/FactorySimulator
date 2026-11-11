import './main.css'
import Navigation from "../navigation/navigation.tsx";
import Workflow from "../workflow/workflow.tsx";
export default function Main() {
    return (
        <div className='main'>
            <Navigation/>
            <Workflow/>
        </div>
    )
}