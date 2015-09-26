$(document).ready(function() {
		
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek'
		},
		allDay: false,
		displayEventEnd: true,
		editable: false,
		eventLimit: 5, // allow "more" link when too many events
		fixedWeekCount: false,
		googleCalendarApiKey: 'AIzaSyCtq5y1rGdrlNnqDs1n1GBavHy4lDstckM',
		height: 'auto',
		weekends: false, 
		eventSources: [
			{
				googleCalendarId: 'kimberlizhong@gmail.com',
				className: 'calendar1',
			}, 
			{
				googleCalendarId: 've8r280thumd5h4u5jqg69c1to@group.calendar.google.com',
				className: 'calendar1',
			},
			{
				googleCalendarId: '498kovu11pdglistkeac14k61o@group.calendar.google.com',
				className: 'calendar3',
			},
			{
				googleCalendarId: 'iec62ftusfqn2jk1phv465s29o@group.calendar.google.com',
				className: 'calendar2',
			},
			{
				googleCalendarId: '4cj5594qdd3c48beoopmpfeih4@group.calendar.google.com',
				className: 'calendar2',
			}
		],
		viewRender: function(currentView){
			var minDate = moment().startOf('month');
			while (minDate.day() < 2 || minDate.day() > 4) {
			    minDate.add(1, 'day');
			}
			var maxDate = moment().add(1,'month').endOf('month');
			while (maxDate.day() < 2 || maxDate.day() > 4) {
			    maxDate.subtract(1, 'day');
			}
			if (minDate.isAfter(currentView.start) && minDate.isBefore(currentView.end)) {
				$(".fc-prev-button").prop('disabled', true); 
				$(".fc-prev-button").addClass('fc-state-disabled'); 
			}
			else {
				$(".fc-prev-button").removeClass('fc-state-disabled'); 
				$(".fc-prev-button").prop('disabled', false); 
			}
			if (maxDate.isAfter(currentView.start) && maxDate.isBefore(currentView.end)) {
				$(".fc-next-button").prop('disabled', true); 
				$(".fc-next-button").addClass('fc-state-disabled'); 
			} else {
				$(".fc-next-button").removeClass('fc-state-disabled'); 
				$(".fc-next-button").prop('disabled', false); 
			}
		}
	});
	
});