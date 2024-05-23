import React from 'react';
import classes from './Notification.module.css'


export default function Notification() {
    return (
        <div className={classes.MainContainer}>
                <h3>Notifications</h3>
                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainer}>
                        TW
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                            Tierra Whack
                        </div>
                        <div className={classes.Description}>
                            Marked the <strong className={classes.Highlight}>Bugs analysis</strong> task as done
                        </div>
                    </div>
                    <div className={classes.Time}>
                        2 min ago
                    </div>
                </div>

                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainerTwo}>
                        JW
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                            Jaques Webster
                        </div>
                        <div className={classes.Description}>
                            Added 2 files to <strong className={classes.Highlight}>Competitors analysis</strong> task
                        </div>
                    </div>
                    <div className={classes.Time}>
                        52 min ago
                    </div>
                </div>

                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainerThree}>
                        SC
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                          Shawn Carter
                        </div>
                        <div className={classes.Description}>
                            Lived the voice message <strong className={classes.Highlight}>Task for Graphic</strong>
                        </div>
                    </div>
                    <div className={classes.Time}>
                        4 min ago
                    </div>
                </div>


                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainerFour}>
                        NK
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                          Nishant Kumar
                        </div>
                        <div className={classes.Description}>
                           Added new report for <strong className={classes.Highlight}>Task for Dashboard</strong>
                        </div>
                    </div>
                    <div className={classes.Time}>
                        54 min ago
                    </div>
                </div>
                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainerFour}>
                        NK
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                          Nishant Kumar
                        </div>
                        <div className={classes.Description}>
                          Dropdown for <strong className={classes.Highlight}>Sidebar</strong> implemented
                        </div>
                    </div>
                    <div className={classes.Time}>
                        5 min ago
                    </div>
                </div>
                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainerTwo}>
                        JW
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                            Jaques Webster
                        </div>
                        <div className={classes.Description}>
                           Sent files belongs <strong className={classes.Highlight}>Competitors analysis</strong> to TL
                        </div>
                    </div>
                    <div className={classes.Time}>
                        10 min ago
                    </div>
                </div>
                <div className={classes.NotificationTab}>
                    <div className={classes.ProfileContainer}>
                        TW
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.Name}>
                            Tierra Whack
                        </div>
                        <div className={classes.Description}>
                            Completed <strong className={classes.Highlight}>Dashboard</strong> component design 
                        </div>
                    </div>
                    <div className={classes.Time}>
                        2 min ago
                    </div>
                </div>
         
        </div>
    )
}
