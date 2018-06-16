import * as React from 'react';
import { FilterType, ItodoAppState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { filterChange } from '../actions/index';
import './Toolbar.css';

export interface ItoolbarProps { filterValue: FilterType; onFilterChange: (value: FilterType) => void; }

export const Toolbar = ({ filterValue, onFilterChange }: ItoolbarProps) => (
    <div className="Toolbar">
        <h3>Filter list by status</h3>
        <div className="Toolbar-filters">
            <label htmlFor="radio-1">
                <input
                    id="radio-1"
                    name="radio-1"
                    onChange={e => onFilterChange(e.target.value as FilterType)}
                    checked={filterValue === 'ALL'}
                    type="radio"
                    radioGroup="filter"
                    value="ALL"
                />All
            </label>
            <label htmlFor="radio-2">
                <input
                    id="radio-2"
                    name="radio-2"
                    onChange={e => onFilterChange(e.target.value as FilterType)}
                    checked={filterValue === 'DONE'}
                    type="radio"
                    radioGroup="filter"
                    value="DONE"
                />Done
                </label>
            <label htmlFor="radio-3">
                <input
                    id="radio-3"
                    name="radio-3"
                    onChange={e => onFilterChange(e.target.value as FilterType)}
                    checked={filterValue === 'TODO'}
                    type="radio"
                    radioGroup="filter"
                    value="TODO"
                />To-Do
                </label>
        </div>
    </div>
);

const mapStateToProps = (state: ItodoAppState) => {
    return {
        filterValue: state.filter
    };
};
// tslint:disable-next-line:no-any
const mapDispacthToProps = (dispatch: Dispatch<any>) => {
    return {
        onFilterChange: (value: FilterType) => {
            dispatch(filterChange(value));
        }

    };
};
export default connect(mapStateToProps, mapDispacthToProps)(Toolbar);