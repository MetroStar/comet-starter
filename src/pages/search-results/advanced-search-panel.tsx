import { Button, DatePicker, Select, TextInput } from '@metrostar/comet-uswds';
import { CaseSearchFilters } from '@src/types/case';
import React, { useState } from 'react';
import './advanced-search-panel.scss';

interface AdvancedSearchPanelProps {
  initialFilters: CaseSearchFilters;
  onSearch: (filters: CaseSearchFilters) => void;
  onClear: () => void;
  onClose: () => void;
}

export const AdvancedSearchPanel = ({
  initialFilters,
  onSearch,
  onClear,
}: AdvancedSearchPanelProps): React.ReactElement => {
  const [filters, setFilters] = useState<CaseSearchFilters>(initialFilters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  return (
    <form
      className="advanced-search-panel"
      onSubmit={handleSearch}
      aria-label="Advanced search panel"
    >
      <div className="advanced-search-panel__content">
        <div className="grid-container">
          <div className="grid-row">
            <div className="grid-col-12">
              <TextInput
                id="id"
                label="Case ID"
                value={filters.id || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12">
              <TextInput
                id="last_name"
                label="Last Name"
                value={filters.last_name || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12">
              <TextInput
                id="first_name"
                label="First Name"
                value={filters.first_name || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12">
              <TextInput
                id="assigned_to"
                label="Assigned To"
                value={filters.assigned_to || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12">
              <Select
                id="status"
                label="Status"
                value={filters.status || ''}
                onChange={handleChange}
                options={[
                  { value: '', label: '- Select -' },
                  { value: 'Not Started', label: 'Not Started' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Approved', label: 'Approved' },
                  { value: 'Denied', label: 'Denied' },
                ]}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12">
              <DatePicker
                id="created_after"
                label="Created After"
                value={filters.created_after || ''}
                onChange={(e) =>
                  handleDateChange(
                    'created_after',
                    (e &&
                      'target' in e &&
                      (e.target as HTMLInputElement).value) ||
                      '',
                  )
                }
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12 margin-bottom-3">
              <DatePicker
                id="created_before"
                label="Created Before"
                value={filters.created_before || ''}
                onChange={(e) =>
                  handleDateChange(
                    'created_before',
                    (e &&
                      'target' in e &&
                      (e.target as HTMLInputElement).value) ||
                      '',
                  )
                }
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12 display-flex flex-align-end">
              <div className="advanced-search-panel__actions">
                <Button id="search-btn" type="submit">
                  Search
                </Button>
                <Button
                  id="clear-btn"
                  type="button"
                  onClick={handleClear}
                  variant="secondary"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
