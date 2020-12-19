<%@ page import="java.util.*" %>
<%@ page import="com.ohrid.stays.StaysService" %>
<%@ page import="com.ohrid.stays.Stay" %>
<!DOCTYPE html>
<html>
<body>
<div style="text-align: center;">
    <h1>
        Available Stays
    </h1>
    <%
        List result = (List) request.getAttribute("stays");
        Iterator i = result.iterator();

        while(i.hasNext()) {
            out.println(i.next()+"<br>");
        }
    %>
</div>
</body>
</html>