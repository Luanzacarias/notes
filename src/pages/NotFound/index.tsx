import { Player } from '@lottiefiles/react-lottie-player';
import './styles.scss';

export function NotFound(){
    return (
        <div id="not-found">
            <Player
                autoplay
                src='https://assets7.lottiefiles.com/packages/lf20_s5ovcmrl.json'
                style={{width: '160px', height: '160px'}}
                speed={1.25}
            />
            <h1>Página não encontrada.</h1>
            <p>Verifique a URL inserida.</p>
        </div>
    )
}