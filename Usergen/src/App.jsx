import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [proposition, setProposition] = useState([]);
  const [dico, setDico] = useState([]);
  const [motsaisies, setMotsaisies] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          "https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json"
        )
        .then((res) => {
          setDico(res.data);
        });
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    setProposition([]);
    const nouvelleproposition = [];
    for (let index = 0; index < 12; index++) {
      const mot1 = motsaisies || dico[Math.floor(Math.random() * dico.length)];
      const mot2 = dico[Math.floor(Math.random() * dico.length)];
      const number = Math.floor(Math.random() * 10);
      nouvelleproposition.push(number % 2 === 0 ? mot1 + mot2 : mot2 + mot1);
    }

    setProposition(nouvelleproposition);
  };

  return (
    <div className="App">
      <h1 className=" text-4xl py-5 font-bold">Générateur de Pseudo</h1>
      <input placeholder="Saissisez un mot (optionnel)" value={motsaisies} className="rounded-md p-2 w-64 mb-6 bg-white text-black" type="text" onChange={(e) => setMotsaisies(e.target.value)} />
      <button className="bg-gray-400 text-white py-2 px-4 mb-8 rounded" onClick={handleSubmit}>Générer</button>
      <div className="grid grid-cols-3">
        {proposition.map((mot, index) => (
          <div key={index}>{mot}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
