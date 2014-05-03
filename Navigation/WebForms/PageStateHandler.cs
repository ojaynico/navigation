﻿using System;
using System.Collections.Specialized;
using System.Text;
using System.Web;
#if NET40Plus
using System.Web.Routing;
#endif
#if NET45Plus
using System.Web.WebPages;
#endif

namespace Navigation
{
	/// <summary>
	/// Implementation of <see cref="Navigation.IStateHandler"/> that builds and parses
	/// navigation links for a Web Forms <see cref="Navigation.State"/>
	/// </summary>
#if NET40Plus
	public class PageStateHandler : StateHandler
#else
	public class PageStateHandler : IStateHandler
#endif
	{
#if NET40Plus
		/// <summary>
		/// Gets a link that navigates to the <paramref name="state"/> passing the <paramref name="data"/>.
		/// </summary>
		/// <param name="state">The <see cref="Navigation.State"/> to navigate to</param>
		/// <param name="data">The data to pass when navigating</param>
		/// <param name="context">The current context</param>
		/// <returns>The navigation link</returns>
		public override string GetNavigationLink(State state, NameValueCollection data, HttpContextBase context)
		{
			if (GetRouteName(state, context) != null)
			{
				return base.GetNavigationLink(state, data, context);
			}
			else
			{
				return GetLink(state, data, GetMobile(context), context.Request.ApplicationPath);
			}
		}

		/// <summary>
		/// Returns the route of the <paramref name="state"/>
		/// </summary>
		/// <param name="state">The <see cref="Navigation.State"/> to navigate to</param>
		/// <param name="context">The current context</param>
		/// <returns>The route name</returns>
		protected override string GetRouteName(State state, HttpContextBase context)
		{
			bool mobile = GetMobile(context);
			return RouteTable.Routes[state.GetRouteName(mobile)] != null ? state.GetRouteName(mobile) : null;
		}

		protected override bool GetEndResponse(State state, HttpContextBase context)
		{
			return true;
		}
#else
		/// <summary>
		/// Gets a link that navigates to the <paramref name="state"/> passing the <paramref name="data"/>
		/// </summary>
		/// <param name="state">The <see cref="Navigation.State"/> to navigate to</param>
		/// <param name="data">The data to pass when navigating</param>
		/// <param name="context">The current context</param>
		/// <returns>The navigation link</returns>
		public string GetNavigationLink(State state, NameValueCollection data)
		{
			string applicationPath = HttpContext.Current != null ? HttpContext.Current.Request.ApplicationPath : NavigationSettings.Config.ApplicationPath;
			return GetLink(state, data, GetMobile(HttpContext.Current), applicationPath);
		}

		/// <summary>
		/// Gets the data parsed from the <paramref name="data">context data</paramref>
		/// </summary>
		/// <param name="state">The <see cref="Navigation.State"/> navigated to</param>
		/// <param name="data">The current context data</param>
		/// <returns>The navigation data</returns>
		public NameValueCollection GetNavigationData(State state, NameValueCollection data)
		{
			return new NameValueCollection(data);
		}

		public void NavigateLink(State state, string url, NavigationMode mode)
		{
			if (HttpContext.Current == null) mode = NavigationMode.Mock;
			switch (mode)
			{
				case (NavigationMode.Client):
					{
						HttpContext.Current.Response.Redirect(url, true);
						break;
					}
				case (NavigationMode.Server):
					{
						HttpContext.Current.Server.Transfer(url);
						break;
					}
				case (NavigationMode.Mock):
					{
						StateController.SetStateContext(state.Id, HttpUtility.ParseQueryString(url.Substring(url.IndexOf("?", StringComparison.Ordinal))));
						break;
					}
			}
		}
#endif
#if NET40Plus
		private bool GetMobile(HttpContextBase context)
#else
		private bool GetMobile(HttpContext context)
#endif
		{
#if NET45Plus
			return context.GetOverriddenBrowser().IsMobileDevice;
#else
			return context != null && context.Request.Browser.IsMobileDevice;
#endif
		}

		private string GetLink(State state, NameValueCollection data, bool mobile, string applicationPath)
		{
			StringBuilder link = new StringBuilder();
			link.Append(VirtualPathUtility.ToAbsolute(state.GetPage(mobile), applicationPath));
			link.Append("?");
			link.Append(HttpUtility.UrlEncode(NavigationSettings.Config.StateIdKey));
			link.Append("=");
			link.Append(HttpUtility.UrlEncode(state.Id));
			foreach (string key in data)
			{
				if (key != NavigationSettings.Config.StateIdKey)
				{
					link.Append("&");
					link.Append(HttpUtility.UrlEncode(key));
					link.Append("=");
					link.Append(HttpUtility.UrlEncode(data[key]));
				}
			}
			return link.ToString();
		}
	}
}
