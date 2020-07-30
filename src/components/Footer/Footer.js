import React from 'react'
import './Footer.css'

export default function Footer() {



    return (
        <div className="footer-container"style={{ bottom: "0vh", left: "0vw"}}>
            <footer style={{position: "relative", fontSize: "10px", color: "grey", bottom: "0", left: "0", top: 20}}>            
            All investments involve risk, and the past performance of a security, industry, sector, market, financial product, trading strategy, or individual’s trading does not guarantee future results or returns. 
            Investors are fully responsible for any investment decisions they make.
            Such decisions should be based solely on an evaluation of their financial circumstances, investment objectives, risk tolerance, and liquidity needs.
            Any opinions, news, research, analyses, prices, or other information offered by ___ is provided as general market commentary, and does not constitute investment advice. 
            ___will not accept liability for any loss or damage, including without limitation any loss of profit, which may arise directly or indirectly from use of or reliance on such information. </footer>
            
        </div>
    )
}
