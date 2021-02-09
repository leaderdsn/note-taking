import { Image } from "react-bootstrap"
import logo from '../../images/logo-app.jpg';

/** Логотип приложения */
export default function logotype() {
    return (
        <>
            <Image src={logo} className="img-thumbnail mx-auto d-block w-50" roundedCircle />
            <h1 className="text-center mb-4">Note-taking</h1>
        </>
    )
}