import Dropdown from 'react-bootstrap/Dropdown';

function DropdownMenu({children, optionsList}) {
  return (
    <div class="max-w-xs">
      <Dropdown class="max-w-xs">
        <Dropdown.Toggle variant="success" size="sm" style={{ width: "100%", height: "100%" }}>
          {children}
        </Dropdown.Toggle>
        <DropdownItems 
          optionsList={optionsList}
        />
      </Dropdown>
    </div>
  );
}

function DropdownItems(optionsList) {
  return(
    <>
      <Dropdown.Menu>
        {optionsList.optionsList.map(function(option){
          return (<>
              <Dropdown.Item>{option}</Dropdown.Item>
            </>);
        })}
      </Dropdown.Menu>
    </>
  );
}

export default DropdownMenu;
