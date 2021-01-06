import React from 'react'
import { ButtonRecRadSolidBlue } from '../../components/Buttons'
import PageTitle from '../../components/PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import SearchBar from '../../components/SearchBar'
import TaskTicket from '../../components/TaskTicket'

const DashboardScreen = () => {
    return (
        <>
            <PageTitle title="Dashboard"/>
            <div className="first-row__menu">
                <ButtonRecRadSolidBlue text={<span><FontAwesomeIcon icon={faPlus}/><span>&nbsp;&nbsp;Create Task</span></span>} width="150px"/>
                <SearchBar label="Search by Description"/>
            </div>
            <div className="second-row__menu">
                <div className="second-row__menu__filter">
                    <ButtonRecRadSolidBlue text="All" isActive={true} width="120px" marginRight="16px"/>
                    <ButtonRecRadSolidBlue text="Incomplete" isActive={false} width="120px" marginRight="16px"/>
                    <ButtonRecRadSolidBlue text="Completed" isActive={false} width="120px" marginRight="16px"/>
                </div>
                <SearchBar label="Search by Tag"/>
            </div>
            <div className="tasks__container">
                <TaskTicket/>
            </div>
            
        </>
    )
}

export default DashboardScreen
