import { Player } from '@lottiefiles/react-lottie-player';
import './styles.scss';
export function Loading(){
    return(
        <div id="loading">
            <Player
                autoplay
                loop
                src='https://assets6.lottiefiles.com/packages/lf20_rxpugebj.json'
                style={{ height: '150px', width: '150px' }}
            />
            <p>carregando suas notas...</p>
        </div>
        
    )
}