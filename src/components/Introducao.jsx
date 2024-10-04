import './css/styleINtroducao.css';
import CarroFundo from '../assets/image/carro.mp4';
export function Introducao(){

    return(

        <section id='inicio'>

            <video autoPlay loop muted>

                <source src={CarroFundo} type="video/mp4"/>
            
            </video>

        </section>

    )

}