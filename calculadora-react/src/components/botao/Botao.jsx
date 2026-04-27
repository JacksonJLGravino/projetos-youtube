import './Botao.css'

export function Botao({color, background, text, onClick}) {
  return (
    <button className='botao' style={{color: color, background: background}} onClick={onClick}>
      {text}
    </button>
  );
}