var React = require('react');

class MasterLayout extends React.Component {
  render() {
    return (
            <html lang="de">
                    <head>           
                        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />                        
                        <title>{this.props.name}</title>
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