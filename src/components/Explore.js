import './Explore.css';

export default function Explore() {
    return (
        <div className="explore-text">
            <body>
                <h4>Here are some ways to support</h4>
                <ul>
                    <li>Volunteer!</li>
                    <li>Donate to local your local food pantry</li>
                        <ul>
                            <il>Use our search system to get their contact information</il>
                        </ul>
                    <li>Suggest additional locations</li>
                        <ul>
                            <li>Fill out this form: 
                                <a 
                                href="https://example.com/form">
                                Click here </a>
                            </li>
                        </ul>
                    <li>Review a location</li>
                </ul>
            </body>
        </div>

    );
};