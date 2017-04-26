var React = require('react');

class MasterLayout extends Component {
  render() {
    return (
            <html lang="de">
                    <head>           
                        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />                                                
                        <link rel="stylesheet" href="./static/css/style.css" />
                    </head>
                    <body>
                        {this.props.children}
                    </body>
            </html>
        )
  }
};

module.exports = MasterLayout;