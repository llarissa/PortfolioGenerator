var React = require('react');
var DefaultLayout = require('./layout/master');

class IndexComponent extends React.Component {
  render() {
    return (         
            <DefaultLayout name={this.props.name}>
                  <div>
                      <h1>Der Portfolio Generator mit React !!!</h1>
                  </div>
            </DefaultLayout>         
    )                   
  }
}

module.exports = IndexComponent;