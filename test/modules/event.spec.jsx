import React from 'src/React'

import {beforeHook, afterHook, browser} from 'karma-event-driver-ext/cjs/event-driver-hooks';
let {$serial} = browser;

describe('ReactDOM.render返回根组件的实例', function () {
    this.timeout(200000);
    before(async() => {
        await beforeHook();
    });
    after(async() => {
        await afterHook(false);
    });
    it('事件与样式', async() => {
        class A extends React.Component {
            constructor() {
                super()
                this.state = {
                    aaa: 111
                }
            }
            click(e) {
                this.setState({
                    aaa: this.state.aaa + 1
                })
            }
            componentDidMount() {
                browser.$next();
            }
            componentDidUpdate() {
                browser.$next();

            }
            render() {
                return (
                    <div
                        id="aaa"
                        style={{height:this.state.aaa}}
                        onClick={this
                        .click
                        .bind(this)}>
                        {this.state.aaa}
                    </div>
                )
            }
        }
       
        var div = document.createElement('div');

        document.body.appendChild(div);
         var  rootInstance = ReactDOM.render(
                <A/>, div);
      return  $serial(async() => {
            await browser
                .click('#aaa')
                .$apply('wait');
            expect(rootInstance.state.aaa).toBe(112)
        }, async() => {
            await browser
                .click('#aaa')
                .$apply('wait');
            expect(rootInstance.state.aaa).toBe(113)
            expect(rootInstance.vnode.dom.style.height).toBe('113px')
            document.body.removeChild(div)

        });

    })

})