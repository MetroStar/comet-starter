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
  onClose,
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
    onClose();
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
      <div className="advanced-search-panel__close">
        <Button
          id="close-btn"
          type="button"
          onClick={onClose}
          variant="unstyled"
          aria-label="Close advanced search panel"
        >
          Close
        </Button>
      </div>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-4 margin-right-3">
            <TextInput
              id="id"
              label="Case ID"
              value={filters.id || ''}
              onChange={handleChange}
            />
          </div>
          <div className="grid-col-4 margin-right-3">
            <TextInput
              id="last_name"
              label="Last Name"
              value={filters.last_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="grid-col-4">
            <TextInput
              id="first_name"
              label="First Name"
              value={filters.first_name || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col-4 margin-right-3">
            <TextInput
              id="assigned_to"
              label="Assigned To"
              value={filters.assigned_to || ''}
              onChange={handleChange}
            />
          </div>
          <div className="grid-col-4 margin-right-3">
            <Select
              id="status"
              label="Status"
              value={filters.status || ''}
              onChange={handleChange}
              options={[
                { value: 'Not Started', label: 'Not Started' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Approved', label: 'Approved' },
                { value: 'Denied', label: 'Denied' },
              ]}
            />
          </div>
          <div className="grid-col-4">
            <DatePicker
              id="created_after"
              label="Created After"
              value={filters.created_after || ''}
              onChange={(e) =>
                handleDateChange(
                  'createdAfter',
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
          <div className="grid-col-4 margin-right-3">
            <DatePicker
              id="created_before"
              label="Created Before"
              value={filters.created_before || ''}
              onChange={(e) =>
                handleDateChange(
                  'createdBefore',
                  (e &&
                    'target' in e &&
                    (e.target as HTMLInputElement).value) ||
                    '',
                )
              }
            />
          </div>
          <div className="grid-col-4 margin-right-3"></div>
          <div className="grid-col-4 margin-top-5">
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
    </form>
  );
};
