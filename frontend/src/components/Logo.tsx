import { Link } from "react-router-dom";

export default function Logo({...props}) {
    return (
        <Link to={'/'}>
            <img {...props} src="/logo.png" alt="Stacklink logo" />
        </Link>
    )
}