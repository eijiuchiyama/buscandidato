import Dropdown from 'react-bootstrap/Dropdown';

function DropdownMenu({children, optionsList}) {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          {children}
        </Dropdown.Toggle>
        <DropdownItems 
          optionsList={optionsList}
        />
      </Dropdown>
    </>
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
