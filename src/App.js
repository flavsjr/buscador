import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import { IMaskInput } from 'react-imask';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    
    if (input === ''){
      alert("Digite algum cep!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("Ops erro ao localizar o cep");
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <IMaskInput mask="00000-000" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite o seu CEP"/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

    {Object.keys(cep).length > 0 && (
      <main className="main">
      <h2>CEP: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>{cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
      </main>
    )}
    
    </div>
  );
}

export default App;
