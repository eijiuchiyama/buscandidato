function ContentBox({ children, header }) {
  return (
    <>
      <div >
        <h1 class="text-center"> {header} </h1>
        <div class="rounded m-3 p-5" style={{backgroundColor:"#444444"}}> {children} </div> 
      </div>
    </>
  );
}

export default ContentBox;
