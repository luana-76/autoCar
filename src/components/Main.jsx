import { CadastroVeiculos } from "./cadastroVeiculos";
import { Footer } from "./Footer";
import { Introducao } from "./Introducao";
import { ListagemVeiculo } from "./listagemVeiculos";

export function Main(prop){

    return(

        <main>
        
            <Introducao/>
            <CadastroVeiculos
            setProducts={prop.setProducts}
            setEditMode={prop.setEditMode}
            />
            <ListagemVeiculo
            products={prop.products}
            setProducts={prop.setProducts}
            setEditId={prop.setEditId}
            setEditMode={prop.setEditMode}
            />
            <Footer/>

        </main>
    )

}