import { useState, useEffect } from "react";
import CardAddHistoria from "../components/CardAddHistoria";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";
import usePalette from "../hooks/usePalette";
const AddHistorias = () => {
  //Use
  const { pacientes, obtenerPaciente } = usePacientes();

  //States
  const [docPropietario, setDocPropietario] = useState("");
  const [alerta, setAlerta] = useState({});
  const [PACIENTES,setPACIENTES] = useState(pacientes);
  //---

  //Variables
  const {modoOscuro} = usePalette();
  const sectionClase = `relative md:mt-2 ${modoOscuro ? 'bg-gray-900 ' : 'bg-slate-100'} md:px-3 rounded-lg overflow-y-auto max-h-[660px] md:max-h-[400px]`;
  //---

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevos_pacientes = (await obtenerPaciente(docPropietario));
    if([docPropietario].includes("")) {
      setPACIENTES(pacientes)
      return;
    }
    if(nuevos_pacientes.length < 1){
      setAlerta({msg:"No se encontró el paciente",error:true});
      return;
    }
    
    setPACIENTES(nuevos_pacientes);
    setAlerta({msg:"Se encontraron datos",error:false})
  };
  //---

  //useEffect
  useEffect(() => {
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  }, [alerta.msg]);
  //---
  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className={`${modoOscuro ? 'text-gray-300' : 'text-black'}`}>Tus historias clínicas</h2>
        <p className="text-zinc-500 text-[12px]">
          Registra historias clínicas a tus pacientes
        </p>
      </div>
      <div>
        <section className={sectionClase}>
          <div className="mb-2">
            <form
              onSubmit={handleSubmit}
              className="px-5 py-2 flex items-center gap-2"
              action=""
            >
              <input
                className="p-[10px] outline-none bg-zinc-900 rounded-lg text-white text-[11px] w-[180px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                min={0}
                value={docPropietario}
                onChange={(e) => {
                  setDocPropietario(e.target.value);
                }}
                placeholder="Doc.Propietario"
              />
              <button
                className="text-white flex items-center justify-center hover:bg-gray-800 transition-all rounded-lg p-2 bg-gray-700"
                type="submit"
              >
                <ion-icon name="search-outline"></ion-icon>
              </button>
            </form>
          </div>
          <hr className="mt-3" />
          <div className="p-2">
            {alerta.msg && <Alerta alerta={alerta} />}
            {PACIENTES.map((paciente) => {
              return (
                <CardAddHistoria
                  key={paciente._id}
                  paciente={paciente}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddHistorias;
