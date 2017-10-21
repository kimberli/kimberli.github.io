$(document).ready(function() {

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next',
			center: 'title',
			right: 'today',
		},
        buttonIcons: {
            prev: '',
            next: '',
        },
        buttonText: {
            prev: '<',
            next: '>',
        },
		allDaySlot: false,
		defaultView: 'agendaWeekCustom',
		minTime: "9:00:00",
        validRange: function(nowDate) {
            return {
                start: nowDate.startOf('month'),
                end: nowDate.clone().add(1, 'months').endOf('month')
            };
        },
		displayEventEnd: true,
		editable: false,
		eventLimit: 5, // allow "more" link when too many events
		fixedWeekCount: false,
		timezone: 'local',
		googleCalendarApiKey: 'AIzaSyCtq5y1rGdrlNnqDs1n1GBavHy4lDstckM',
		height: 'auto',
		weekends: false,
		eventSources: [
			{
				googleCalendarId: 'kimberlizhong@gmail.com',
				className: 'calendar1',
			},
		],
		views: {
			agendaWeekCustom: {
	            type: 'agenda',
	            duration: { days: 7 },
	            buttonText: 'week'
	        },
	        basicWeekCustom: {
	            type: 'basicWeek',
	            duration: { days: 7 },
	            buttonText: 'agenda'
	        },
    	}
	});

});
