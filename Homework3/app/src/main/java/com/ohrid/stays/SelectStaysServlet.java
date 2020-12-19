package com.ohrid.stays;

import com.ohrid.stays.model.StayType;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


public class SelectStaysServlet extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String stayType = req.getParameter("Type");

        StaysService staysService = new StaysService();
        StayType st = StayType.valueOf(stayType);

        List<Stay> stays = staysService.getStays(st);

        req.setAttribute("stays", stays);

        RequestDispatcher view = req.getRequestDispatcher("result.jsp");
        view.forward(req, resp);
    }
}
