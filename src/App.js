import { useState, useRef } from "react";
import  SequinGrid  from './sequin-grid.js'
import { memo } from "react";

function Hed() {
  return (
      <div className="head">
        <h1>S E Q U I N S ?</h1>
      </div>
  ); 
}

let brushcolor = "black"
let currentCanvSize = 160


function Grids(props) {
  let newSize = props.size 
  if(props.size > 100){
    newSize = props.size/10
  }
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
  const cellSize = containerSize/newSize

  return (
    <div className="grid-container" style={{
      gridTemplateColumns: `repeat(${newSize}, ${cellSize}px)`, 
      gridTemplateRows: `repeat(${newSize}, ${cellSize}px)`,
      maxWidth: `${containerSize}px`,
      maxHeight: `${containerSize}px`, 
    }}
    onMouseDown={() => {mouseDown= true}}
    onMouseUp={() => {mouseDown= false}}
    >
     {generateGrids(newSize)}
    </div>
  )
}

const MemoizedGrids = memo(Grids, (prevProps, nextProps) => {
  // Only re-render if the size prop changes
  return prevProps.size === nextProps.size;
});


function RenderButtonsCanvas() {
  const [canvas, setCanvasSize] = useState({size: 16})
  const [showSequin, setShowSequin] = useState(false)
  //had to use object notation so that in order for react to re-render
  //even if we pass the same value, react looks at memory location

  function handleChoose(canv){
    setCanvasSize({size: canv})
  }
  
  function handleReset(){
    if(currentCanvSize > 100){
      currentCanvSize = currentCanvSize /10
    }else {
      currentCanvSize = currentCanvSize * 10
    }
    //this keeps changing the current canvas size for reset
    //otherwise restting wont work because we memoized the sketchpad
    //to not re render unless a change was made to the size of the canvas
  }

  function handleSequin(flag){
    setShowSequin(flag)
  }

  function ChoosingButton() {
    function DropdownOptions() {
      return (
          <div className="dropdown-content">
            <a onClick={() => {
              currentCanvSize = 160 
              handleChoose(16)}}>
                16x16</a>
            <a onClick={() => {
              currentCanvSize = 320
              handleChoose(32)}}>
                32x32</a>
            <a onClick={() => {
              currentCanvSize = 640
              handleChoose(64)}}>
                64x64</a>
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
        
        <button className="reset-canv-btn" onClick={() =>{ 
          handleReset()
          handleChoose(currentCanvSize)}
          }>
            Reset Canvas
            </button>

        <button className="sequin-btn" onClick={() => handleSequin(!showSequin)}>SEQUINS!!??</button>
      </div>
            /*the buttons dont work properly, i think its because pressing the buttons
            cause the grids to be rendered all over again; generates a whole new grid 
            with each click because the states have been updated by useState*/
    )
  }

  return (
    <div className="canvas-buttons">
      <div className="canvas-holder">
        <MemoizedGrids size={canvas.size}  />
        <SequinGrid isVisible = {showSequin} />
      </div>
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
