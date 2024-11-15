function ListEntry({ text, photo }) {
  return (
    <div class="container">
      <div class="row align-items-center card-header rounded bg-gray-600 text-left m-3">
          <div class="col"><img src={photo} width="64" height="64"/></div>
          <div class="col-10 text-left">{text}</div>
      </div>
    </div>
  );
}

export default ListEntry;
