import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre) {
            Swal.fire('Error', 'El nombre de usuario es obligatorio', 'error');
            return;
        }

        if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
            Swal.fire('Error', 'El correo no es válido', 'error');
            return;
        }

        if (!password || password.length < 8 || password.length > 15 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)) {
            Swal.fire('Error', 'La contraseña debe tener al menos una letra mayúscula, 1 letra minúscula, 1 dígito, no espacios en blanco, un carácter especial y debe ser de 8 a 15 caracteres de longitud', 'error');
            return;
        }

        const response = await fetch('http://localhost:3010/user/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                password: password
            })
        });

        if (!response.ok) {
            const errors = await response.json();
            Swal.fire('Error', errors.map(error => error.msg).join('\n'), 'error');
        } else {
            const data = await response.json();
            console.log(data);
            Swal.fire('Éxito', 'Registro completado', 'success');
            navigate('/');
        }
    }

    return ( 
        <>
            <div id="form-ui">
                <form onSubmit={handleSubmit} id="form">
                    <div id="form-body">
                        <div id="welcome-lines">
                            <div id="welcome-line-1">AUTOMATAS</div>
                            <img src="/mon.png" alt="Img" />
                            <div id="welcome-line-2">Lopez Ruiz / Gumeta Navarro</div>
                        </div>
                        <div id="input-area">
                            <div className="form-inp">
                                <input placeholder="Nombre de usuario" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            </div>
                            <div className="form-inp">
                                <input placeholder="Correo electronico" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                            </div>
                            <div className="form-inp">
                                <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div id="submit-button-cvr">
                            <button id="submit-button" type="submit">Registrarse</button>
                        </div>
                        <div id="forgot-pass">
                            <Link to="/">Iniciar sesión</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default Registro;