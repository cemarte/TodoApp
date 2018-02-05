import * as React from 'react';
import { FilterType, ItodoAppState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { filterChange } from '../actions/index';
import { Row, Col } from 'antd';
// const { Option } = Select;
export interface ItoolbarProps { filterValue: FilterType; onFilterChange: (value: FilterType) => void; }
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    color: '#fff'
};
export const Toolbar = ({ filterValue, onFilterChange }: ItoolbarProps) => (
    <Row>
        <Col>
            <p style={{ color: '#fff' }}>Filter list by status</p>
            {/* <Select value={filterValue} style={{ width: 120 }} onChange={onFilterChange}>
                <Option value="ALL">All</Option>
                <Option value="DONE">Done</Option>
                <Option value="TODO">To-Do</Option>
            </Select> */}
        </Col>
        <Col>
            <RadioGroup onChange={e => onFilterChange(e.target.value as FilterType)} value={filterValue}>
                <Radio style={radioStyle} value="ALL">All    </Radio>
                <Radio style={radioStyle} value="DONE">Done  </Radio>
                <Radio style={radioStyle} value="TODO">To-Do </Radio>
            </RadioGroup>
        </Col>
    </Row>
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