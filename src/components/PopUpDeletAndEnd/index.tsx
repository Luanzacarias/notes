
import './styles.scss';

type ButtonProps = {
    closePopUp: () => void;
    action: () => void;
    note?: boolean;
    priority?: string;
}

export function PopUpDeleteAndEnd({closePopUp, action, note, priority} : ButtonProps){
    return(
        <div id="popUpDeleteAndEnd">
            <div className="body">
                {
                    note ?
                    <>
                        <h1>Deseja excuir <span className={priority}>nota</span>?</h1>
                        <p>Ao confirmar, não será possível<br/>
                            restaurar a nota deletada.</p>
                    </>
                    :
                    <>
                        <h1>Deseja sair da <span>sessão</span>?</h1>
                        <p>Ao sair, será possível entrar<br/>
                            novamente sem perder dados.</p>
                    </>
                }
                
                <div className="buttons">
                    {
                        note ? 
                        <>
                            <button className="no" onClick={closePopUp} >Não, cancelar</button>
                            <button className="yes" onClick={action} >Sim, excluir</button>
                        </>
                        : 
                        <>
                            <button className="no" onClick={closePopUp} >Não, ficar</button>
                            <button className="yes" onClick={action} >Sim, sair</button>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    )
}