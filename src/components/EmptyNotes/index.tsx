import "./styles.scss";
import emptyImg from '../../assets/Empty-icon.svg'

export function EmptyNotes(){
    return (
        <div id="empty-notes">
            <img src={emptyImg} alt="" />
            <h1>Nenhuma nota por aqui...</h1>
            <p>Adicione notas e consiga<br/>
                se organizar da melhor<br/>
                    forma!</p>
        </div>
    )
}