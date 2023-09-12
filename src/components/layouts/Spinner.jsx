import { ImSpinner } from 'react-icons/im';
import './Spinner.css';

export function Spinner() {
    return (
        <div className="spinner">
            <ImSpinner size={100} className="spinning"/>
        </div>
    )
}