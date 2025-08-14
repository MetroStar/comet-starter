import {
  Button,
  Card,
  CardBody,
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
}

export const AdvancedSearchPanel = ({
  initialFilters,
  onSearch,
  onClear,
}: AdvancedSearchPanelProps): React.ReactElement => {
  const [filters, setFilters] = useState<CaseSearchFilters>(initialFilters);
  const [datePickerKey, setDatePickerKey] = useState(0);

  useEffect(() => {
    onSearch(filters);
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenderChange = (value: string, checked: boolean) => {
    setFilters((prev) => {
      const prevGender = Array.isArray(prev.gender) ? prev.gender : [];
      if (checked) {
        return { ...prev, gender: [...prevGender, value] };
      } else {
        return { ...prev, gender: prevGender.filter((g) => g !== value) };
      }
    });
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
    setDatePickerKey((prev) => prev + 1); // Reset date picker key to re-render
    onClear();
  };

  return (
    <Card id="advanced-search-card" className="custom-card-width">
      <CardBody>
        <form aria-label="Advanced search panel">
          <div className="filters-header" id="filters-header">
            Filters
          </div>
          <div className="padding-1 display-flex flex-column gap-2">
            <TextInput
              id="id"
              label="Case ID"
              value={filters.id || ''}
              onChange={handleChange}
            />
            <label id="gender-label" className="usa-label">
              Gender
            </label>
            <Checkbox
              id="gender-male"
              label="Male"
              checked={
                Array.isArray(filters.gender) && filters.gender.includes('Male')
              }
              onChange={(e) => handleGenderChange('Male', e.target.checked)}
            />
            <Checkbox
              id="gender-female"
              label="Female"
              checked={
                Array.isArray(filters.gender) &&
                filters.gender.includes('Female')
              }
              onChange={(e) => handleGenderChange('Female', e.target.checked)}
            />
            <label id="status-label" className="usa-label">
              Status
            </label>
            {['Not Started', 'In Progress', 'Approved', 'Denied'].map(
              (status) => (
                <Checkbox
                  key={status}
                  id={`status-${status.toLowerCase().replace(/\s+/g, '-')}`}
                  label={status}
                  checked={
                    Array.isArray(filters.status) &&
                    filters.status.includes(status)
                  }
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                />
              ),
            )}
            <DatePicker
              id="created_after"
              key={`created_after-${datePickerKey}`}
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
            <DatePicker
              id="created_before"
              key={`created_before-${datePickerKey}`}
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
            <div className="margin-top-3">
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
        </form>
      </CardBody>
    </Card>
  );
};
