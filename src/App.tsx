import { tab } from "@testing-library/user-event/dist/tab";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

interface Hero {
  id: number;
  name: string;
  power: number;
  life: number;
  id_type_weapon: number;
}

const App = () => {
  // const [listHero, setListHero] = useState<any[]>([
  //   { name: 'Coco' },
  //   { name: 'Zozo' },
  //   { name: 'Toto' },
  // ]);
// let inputIdHeros = (e:React.ChangeEvent<HTMLInputElement>) =>{console.log(e.currentTarget.value)}

  const [listHero, setListHero] = useState<Hero[]>([]);
   const [hero, setHero] = useState<Hero>();

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8080/api/heros/`)
    //   .then((response: AxiosResponse<{ data: Hero[] }>) => {
    //     const myHero: Hero[] = response.data.data;
    //     // const myHeroById = myHero[0]
    //     setListHero(myHero);
    //   });
        axios
       .get('http://localhost:8080/api/heros')
       .then((res: AxiosResponse<{data: Hero[] }>) => {
         const myHeroByID: Hero[] = res.data.data;
         console.log("valeur de myHerosById: " + myHeroByID )
        setListHero([...myHeroByID])
       });
  }, []);

  // let dislpayHerosById =(id:number)=> {
  //   let tab: string[]=[]
  //   let inputIdHeros = (e: React.ChangeEvent<HTMLInputElement>) => {
  //    tab= [...tab, e.currentTarget.value]
  //     }
  //  setHeroId(tab)
  //   }


   
    // axios
    //   .get("http://localhost:8080/api/heros")
    //   .then((response: AxiosResponse<{ data: Hero[] }>) => {
    //     const myHero: Hero[] = response.data.data;
    //     setListHero([...myHero]);
    //   });

const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const id = e.currentTarget.valueAsNumber;
  if(!isNaN(id)) {
    //id !== NaN
  const urlApi = `http://localhost/8080/api/heros/${id}`
  axios.get(urlApi).then((res:AxiosResponse<{ data: Hero[] }>)=>{
      const oneHero: Hero = res.data.data[0];
      setHero(oneHero);
  })
  }else{
    setHero(undefined);

  }
};

  return (
    <div className="App">
      <ul>
        {listHero.map((hero: Hero, id) => (
          <li key={id}>{hero.name} </li>
        ))}
      </ul>
      <hr />
      <h2>Mon heros en fonction d'un Id</h2>
      <input type="number" onChange={handleInputOnChange} />
    {hero ? (
    <p>{hero.name}{hero.power}{hero.life}{hero.id_type_weapon}</p>) : (<p>Rien a afficher</p>)};
      {/* { <input type="text" onChange={}/> } */}
    </div>
  );
};


export default App;
