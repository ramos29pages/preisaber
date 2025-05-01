export default function FilterSelector({semestervalue, setSemester, uniqueSemestersArray}){



    return (
        <>
        
        <div className="mb-6">
            <label className="block mb-2 font-medium text-orange-500">
              Filtrar por Semestre:
            </label>
            <select
              className="w-full p-3 border-2 border-orange-300 rounded-lg bg-white focus:outline-none focus:border-orange-500 transition-colors"
              value={semestervalue}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Todos los semestres</option>
              {uniqueSemestersArray.map((s) => (
                <option key={s} value={s}>
                  Semestre {s}
                </option>
              ))}
            </select>
          </div>
        
        </>
    );
}