import React from 'react'
import { Button, Icon, Table, Image } from 'semantic-ui-react'

const DashboardTable = (props) => {
  console.log("props", props)
  const { headings, fields, dataArray } = props
  return (
    <div>
      <Table compact celled definition>


        <Table.Header>
          <Table.Row>
            {headings.map((e) => {
              return (
                <Table.HeaderCell>{e}</Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>


        <Table.Body>
          {dataArray.map((item) => {
            return (
              <Table.Row></Table.Row>
            )
          })}
        </Table.Body>


        {/* 
        fields.map((field) => {
          <Table.Cell>{item[field]}</Table.Cell>

 */}


        {/* 
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
              >
                <Icon name='user' /> Create New Class
            </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    </div>
  )

}


export default DashboardTable


