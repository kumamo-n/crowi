// @flow
import React from 'react'
import type { Node } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

type Props = {
  children: Node,
  active?: number,
}

type State = {
  active?: number,
}

export default class Tab extends React.Component<Props, State> {
  static defaultProps = {
    active: 1,
  }

  constructor(props: Props) {
    super(props)

    const { active } = props
    this.state = { active }
  }

  toggle(tab: number) {
    return () => {
      if (this.state.active !== tab) {
        this.setState({ active: tab })
      }
    }
  }

  getTabTitles() {
    return React.Children.map(this.props.children, child => {
      const { title = '' } = child.props
      return React.isValidElement(child) ? title : false
    }).filter(title => title !== false)
  }

  renderNavItems() {
    const titles = this.getTabTitles()
    const { active } = this.state
    return titles.map((title, i) => (
      <NavItem key={i + 1}>
        <NavLink active={active === i + 1} onClick={this.toggle(i + 1)}>
          {title}
        </NavLink>
      </NavItem>
    ))
  }

  renderTabPanes() {
    return React.Children.map(this.props.children, (child, i) => {
      if (React.isValidElement(child)) {
        return <TabPane tabId={i + 1}>{child}</TabPane>
      }
    })
  }

  render() {
    const { active: _, ...props } = this.props
    const { active } = this.state
    return (
      <div {...props}>
        <Nav tabs>{this.renderNavItems()}</Nav>
        <TabContent activeTab={active}>{this.renderTabPanes()}</TabContent>
      </div>
    )
  }
}
