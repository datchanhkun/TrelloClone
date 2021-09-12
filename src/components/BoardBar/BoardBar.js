import React from 'react'
import './BoardBar.scss'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'
function BoardBar() {
  return (
    <nav className="navbar-board">
      <BootstrapContainer className="trello-navbar-container">
        <Row>
          <Col sm={10} xs={8} className="col-no-padding">
            <div className="board-info">
              <div className="item board-logo-icon"><i className="fa fa-coffe" />
                <strong>Trello-Clone-Project</strong>
              </div>
              <div className="divider"></div>

              <div className="item board-type">Private Workspace</div>
              <div className="divider"></div>

              <div className="item member-avatar">
                <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/117241906_1591552187672471_8521985825544730116_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KIO8r-lrkZwAX-l8ew1&_nc_ht=scontent.fsgn5-5.fna&oh=0d33f1f319816a5eec29426169d5a980&oe=6160A2A6" alt="member-avt" title="member-avt"/>
                <img src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-9/p526x296/148372949_1752861058208249_8463093399071711149_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=rBx_tPOLOK4AX_gWNTu&_nc_ht=scontent.fsgn5-6.fna&oh=f40b97b48403c6290a3a953d3350261a&oe=615E1EC6" alt="member-avt" title="member-avt"/>
                <img src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/127144663_1690371244457231_6272750570359250694_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=9p6nm_XbR_gAX__H9L4&_nc_ht=scontent.fsgn5-2.fna&oh=3cca02c078bcd3b671b89e0858ee0d74&oe=6161D6B0" alt="member-avt" title="member-avt"/>
                <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/96357667_1513048012189556_6843851457838448640_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_ohc=86b4jErEx8gAX86Y_cl&_nc_ht=scontent.fsgn5-5.fna&oh=0af9249d2b8a13327da3ef726cdbeaf8&oe=6160EF64" alt="member-avt" title="member-avt"/>
                <img src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t31.18172-8/p526x296/28699010_922504324577264_2466551992220005083_o.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=Yw-ne9d06wgAX9UH5yV&_nc_ht=scontent.fsgn5-6.fna&oh=d48da58bfdb1d32fd53219cc11e59e9f&oe=61618904" title="member-avt"/>
                <span className="more-members">+5</span>
                <span className="invite">Invite</span>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={4} className="col-no-padding">
            <div className="board-actions">
              <div className="item menu"><i className="fa fa-ellipsis-h mr-2" /> Show Menu</div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}

export default BoardBar
