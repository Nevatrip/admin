import React from 'react'

export const ScheduleEvent = () => (
  <>
    <script>
      {
        `
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        function getColor(data) {
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          const hour = new Date(data.start).getHours();
          const minutes = new Date(data.start).getMinutes();
          const grad = hour * 15 + (minutes ? ( 360 / 24 ) / minutes : 0 );
  
          return 'hsl('+grad+', 50%, 70%)';
        }
        `
      }
    </script>
    <script id="event-template" type="text/x-kendo-template">
      <span class="tour-template" style={{background: '#: getColor(data) #'}}>
        #: kendo.toString(start, "HH:mm") # - #: kendo.toString(end, "HH:mm") #
      </span>
    </script>
  </>
)