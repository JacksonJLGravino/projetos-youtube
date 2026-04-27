import './BotaoZero.css'

export function BotaoZero({color, background, text, onClick}) {
  return (
    <button className='botaoZero' style={{color: color, background: background}} onClick={onClick}>
      {text}
    </button>
  );
}