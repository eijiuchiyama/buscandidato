function ContentBox({ children, header }) {
  return (
    <>
      <div >
        <h1 class="text-center"> {header} </h1>
        <div class="bg-gray-dark rounded m-3 p-5"> {children} </div> 
      </div>
    </>
  );
}

export default ContentBox;
