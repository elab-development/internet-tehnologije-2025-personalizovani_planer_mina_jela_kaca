//"use client"

type Element = {
    id: number;
    label: string;
    value: string;    
}

type RadioButtonElements = {
    elements: Element[];
    selectedValue: string | null;  //null ako nista nije selektovano
    onChange: (value: string) => void;
}

export function RadioButtonImage({ elements, selectedValue, onChange }: RadioButtonElements){

    return(
        <ul className="flex gap-3">
            {elements.map((element) => (

                    <li key={element.id} className="flex flex-col items-center">
                        {/*Slike su u public folderu. Isti naziv kao i value. PNG */}
                        <img 
                            src={`/images/${element.value}.png`} 
                            alt={element.label} 
                            className="w-30 h-30 mb-3 object-cover rounded"
                        />
                    

                    <button onClick={ () => onChange(element.value)}
                        className={
                            
                            `px-4 py-2 rounded transition-colors +  
                            ${selectedValue === element.value
                                ? "bg-pink-500 text-white font-semibold"
                                : "bg-purple-200 text-black hover:bg-purple-300 font-semibold"}
                        `}>
                        {element.label}
                    </button>
                </li>
            ))}
        </ul>

    );
}