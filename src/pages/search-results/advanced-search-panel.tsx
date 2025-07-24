import {
  Button,
  Checkbox,
  DatePicker,
  TextInput,
} from '@metrostar/comet-uswds';
import { CaseSearchFilters } from '@src/types/case';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    onSearch(filters);
  }, [filters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const prevStatus = Array.isArray(prev.status) ? prev.status : [];
      if (checked) {
        return { ...prev, status: [...prevStatus, value] };
      } else {
        return { ...prev, status: prevStatus.filter((s) => s !== value) };
      }
    });
  };

  const handleDateChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  return (
    <form className="advanced-search-panel" aria-label="Advanced search panel">
      <div className="advanced-search-panel__content">
        <div className="filters-header" id="filters-header">
          Filters
        </div>
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
                id="assigned_to"
                label="Assigned To"
                value={filters.assigned_to || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid-row">
            <div className="grid-col-12">
              <label id="status-label" className="usa-label" htmlFor="status">
                Status
              </label>
              <Checkbox
                id="status-not-started"
                label="Not Started"
                checked={
                  Array.isArray(filters.status) &&
                  filters.status.includes('Not Started')
                }
                onChange={(e) =>
                  handleStatusChange('Not Started', e.target.checked)
                }
              />
              <Checkbox
                id="status-in-progress"
                label="In Progress"
                checked={
                  Array.isArray(filters.status) &&
                  filters.status.includes('In Progress')
                }
                onChange={(e) =>
                  handleStatusChange('In Progress', e.target.checked)
                }
              />
              <Checkbox
                id="status-approved"
                label="Approved"
                checked={
                  Array.isArray(filters.status) &&
                  filters.status.includes('Approved')
                }
                onChange={(e) =>
                  handleStatusChange('Approved', e.target.checked)
                }
              />
              <Checkbox
                id="status-denied"
                label="Denied"
                checked={
                  Array.isArray(filters.status) &&
                  filters.status.includes('Denied')
                }
                onChange={(e) => handleStatusChange('Denied', e.target.checked)}
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
