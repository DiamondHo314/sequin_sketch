import { useState, useRef } from "react";

function Hed() {
  return (
      <div className="head">
        <h1>S E Q U I N S ?</h1>
      </div>
  ); 
}

let brushcolor = "black"


function Grids(props) {
  let mouseDown  = false 

  function GridItem(props) {
    const ref = useRef()

    const fill = () => {
      if(mouseDown){
        ref.current.style.backgroundColor = brushcolor 
      }
    }

      return(
          <div ref={ref} id={props.id} className="grid-items" 
          onClick={ () => {
            mouseDown= true
            fill()
            mouseDown= false}}
          onMouseDown={ () => fill()}
          onMouseEnter={ () => fill()}
          >
          </div>
    ) 
  }

  function generateGrids(size) {
    let grid_holder = []
    for(let i=0; i < (size**2); i++){
      grid_holder.push(<GridItem key={i} id={i}/>)
    }
    return grid_holder;
  }

  const containerSize = 600;
  const cellSize = containerSize/props.size

  return (
    <div className="grid-container" style={{
      gridTemplateColumns: `repeat(${props.size}, ${cellSize}px)`, 
      gridTemplateRows: `repeat(${props.size}, ${cellSize}px)`,
      maxWidth: `${containerSize}px`,
      maxHeight: `${containerSize}px`, 
    }}
    onMouseDown={() => {mouseDown= true}}
    onMouseUp={() => {mouseDown= false}}
    >
     {generateGrids(props.size)}
     <div className="sequin-container"
     style={{
        maxWidth: `${containerSize}px`,
        maxHeight: `${containerSize}px`,
     }}>
      {generateGrids(16)}
     </div>
    </div>
  )
}


function RenderButtonsCanvas() {
  const [canvasSize, setCanvasSize] = useState(16)

  function handleChoose(canv){
    setCanvasSize(canv)
  }

  function ChoosingButton() {
    function DropdownOptions() {
      return (
          <div className="dropdown-content">
            <a onClick={() => handleChoose(16)}>16x16</a>
            <a onClick={() => handleChoose(32)}>32x32</a>
            <a onClick={() => handleChoose(64)}>64x64</a>
          </div>
      )
    }

    const [isDropdown, setDropdown] = useState(false)
    const handleHover = () => {setDropdown(true);};
    const handleUnHover = () => {setDropdown(false);};
    const colorRef = useRef()

    function chooseColor() {
      brushcolor = colorRef.current.value
    }

    return (
      <div className="buttons-div-main">
        <div className="button-container" 
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}>
          <button className="dropdbtn">Choose canvas size</button>
          {isDropdown && <DropdownOptions />}
        </div>
        <button className="eraser-btn" onClick={() => brushcolor = "transparent"}>eraser</button>
        
        <button className="select-color-btn" title="click to select color" onClick={() => chooseColor()}>
          <input ref={colorRef} type="color" className="color-input" /> 
            select color
          </button>
      </div>
            /*the buttons dont work properly, i think its because pressing the buttons
            cause the grids to be rendered all over again; generates a whole new grid 
            with each click because the states have been updated by useState*/
    )
  }

  return (
    <div className="canvas-buttons">
      <Grids size={canvasSize}  />
      <ChoosingButton />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Hed />
      <RenderButtonsCanvas />
    </div>
  );
}

export default App;
