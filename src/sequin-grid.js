import { useRef } from "react";

function SequinGrid(props){
    function SeqItem(props){
        const ref = useRef()

        const removeSequin = () => {
            ref.current.style.backgroundImage = "none" 
        }

        return(
            <div ref={ref} id={props.id} className="seq-item"
            onMouseEnter={() => removeSequin()}
            ></div>
        )
    }
    function generateSeq(){
        let seq_holder = []
        for(let i=0; i < (16**2); i++){
        seq_holder.push(<SeqItem key={i} id={i}/>)
        }
        return seq_holder;
    }
    if(props.isVisible == true) {
        return (
            <div className="sequin-container">
                {generateSeq()}
            </div>
        )
    } else {
        return(null)
    }
}

export default SequinGrid;