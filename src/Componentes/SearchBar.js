import React, { useState } from 'react';
import { 
  TextInput, 
  Select,
  Group,
  Paper
} from '@mantine/core';
import { 
  IconSearch, 
  IconFilter
} from '@tabler/icons-react';
import '../Estilos/SearchBar.css';

const SearchBar = ({ 
  placeholder, 
  onSearch, 
  onFilterChange,
  filterPlaceholder = "Tipo de Operación",
  filterOptions = [],
  showFilter = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
    onFilterChange({ [value]: true });
  };

  return (
    <div className="search-container">
      <Paper shadow="xs" className="search-wrapper">
        <Group spacing="md" className="search-group">
          {showFilter && (
            <>
              <div className="filter-section">
                <IconFilter size={18} className="filter-icon" />
                <div className="filter-text">Filtrar Por</div>
              </div>
              
              <Select
                placeholder={filterPlaceholder}
                value={filterValue}
                onChange={handleFilterChange}
                data={filterOptions}
                className="filter-select"
                clearable
                searchable
                nothingFound="No hay opciones"
                transitionProps={{
                  transition: 'pop-top-left',
                  duration: 200
                }}
              />
            </>
          )}

          <TextInput
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchChange}
            icon={<IconSearch size={16} />}
            className="search-input"
          />
        </Group>
      </Paper>
    </div>
  );
};

export default SearchBar;
